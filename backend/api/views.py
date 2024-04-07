from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .RxNorm import Rx
from django.views.decorators.http import require_http_methods
import json

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