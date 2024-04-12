from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .RxNorm import Rx
from django.views.decorators.http import require_http_methods
import json
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import SearchHistory
from .serializers import SearchHistorySerializer
from django.utils.timezone import now
from rest_framework import generics, permissions
from .models import Prescription
from .serializers import PrescriptionSerializer

def get_data(request):
    message = {'text': 'Hello from Django!'}
    return JsonResponse(message)

@csrf_exempt
@require_http_methods(["POST"])
    
def name_search(request):
    try:
        data = json.loads(request.body)
        drug_name = data.get('name')

        if drug_name is not None:
            return all_drug_search(drug_name)
        else:
            return JsonResponse({'error': 'No drug name provided'})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
    
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
# function to save the search history
def save_search(request):
    # get the query from the request data
    query = request.data.get('query')
    if not query:
        return Response({'error': 'No query provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    # check if the query already exists in the search history
    existing_query = SearchHistory.objects.filter(user=request.user, query=query).first()
    if existing_query:
        existing_query.created_at = now()
        existing_query.save()
    else:
        # create a new entry in the search history if the query does not exist
        SearchHistory.objects.create(user=request.user, query=query)
        
        # if the number of entries in the search history exceeds 10, delete the oldest entry
        if SearchHistory.objects.filter(user=request.user).count() > 10:
            oldest_entry = SearchHistory.objects.filter(user=request.user).order_by('created_at').first()
            oldest_entry.delete()

    return Response({'status': 'Search saved/updated'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])

# function to get the search history
def get_search_history(request):

    # get the search history entries for the current user
    history = SearchHistory.objects.filter(user=request.user).order_by('-created_at')
    serializer = SearchHistorySerializer(history, many=True)
    return Response(serializer.data)

# To create a prescription from frontend, the user must be authenticated,
# So first access the token from the cookie, Then do a post request to the endpoint Like this below
# const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='))?.split('=')[1];
# check if accessToken is not null, then do the post request
# await axios.post('http://localhost:8000/api/prescriptions/', Data(This is the JSON data, that includes 'rxid', 'medication_name', 'dosage', 'expiration_date', 'pharmacy_name'), 
# {headers: { Authorization: `Bearer ${accessToken}` },withCredentials: true,});

# To fetch the prescriptions do the same thing, just a 'get' request to the endpoint, Include the token and with credentials true
class PrescriptionListCreateView(generics.ListCreateAPIView):
    serializer_class = PrescriptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Prescription.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
def manage_results(drug_list):
    for drug in drug_list:
        corrected_name = ""
        if drug.get("rxtermsProperties").get("brandName") == "":
            drug["rxtermsProperties"]["brandName"] = "GENERIC"
            for letter in drug.get("rxtermsProperties").get("displayName"):
                if letter == '/':
                    corrected_name += ', '
                else:
                    corrected_name += letter
            drug["rxtermsProperties"]["displayName"] = corrected_name

@csrf_exempt
def all_drug_search(drug_name):
    search_results = Rx.get_drugs(drug_name)
    drug_id = []
    full_drug_list = []
    for concept_group in search_results.get("drugGroup", {}).get("conceptGroup", []):
        if concept_group.get("tty") == "SBD":
            for concept_property in concept_group.get("conceptProperties", []):
                rxcui = concept_property.get("rxcui")
                drug_id.append(rxcui)
        else: continue
    for drug in drug_id:
        drug_props = Rx.get_rx_properties(drug)
        if "rxtermsProperties" in drug_props:
            full_drug_list.append(drug_props)
            full_drug_list.append(Rx.get_rx_properties(drug_props["rxtermsProperties"].get("genericRxcui")))
    manage_results(full_drug_list)
    return JsonResponse({"all drugs": full_drug_list})
