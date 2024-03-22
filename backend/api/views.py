from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .RxNorm import Rx

def get_data(request):
    message = {'text': 'Hello from Django!'}
    return JsonResponse(message)

@csrf_exempt
def name_search(request):
    print(request.POST)
    drug_name = request.POST.get("name")
    print("Received drug name:", drug_name)
    if drug_name is not None:
        search_results = Rx.get_drugs(drug_name)
        return JsonResponse(search_results)
    else:
        return JsonResponse({'error': 'No drug name provided'})

