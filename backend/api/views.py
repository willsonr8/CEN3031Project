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