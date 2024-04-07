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
        print("Received drug name:", drug_name)

        if drug_name is not None:
            search_results = Rx.get_drugs(drug_name)
            print(search_results)
            return JsonResponse(search_results)
        else:
            return JsonResponse({'error': 'No drug name provided'})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
    
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def save_search(request):
    query = request.data.get('query')
    if not query:
        return Response({'error': 'No query provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    existing_query = SearchHistory.objects.filter(user=request.user, query=query).first()
    
    if existing_query:
        existing_query.created_at = now()
        existing_query.save()
    else:
        SearchHistory.objects.create(user=request.user, query=query)
        
        if SearchHistory.objects.filter(user=request.user).count() > 10:
            oldest_entry = SearchHistory.objects.filter(user=request.user).order_by('created_at').first()
            oldest_entry.delete()

    return Response({'status': 'Search saved/updated'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_search_history(request):
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