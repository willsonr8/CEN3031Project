import requests
import json

# RxNorm API class
class Rx:
    # URL for the RxNorm API
    URL = 'https://rxnav.nlm.nih.gov'

    @classmethod
    # function to make a request to the RxNorm API
    def make_request(cls, endpoint):
        r = requests.get(f'{cls.URL}{endpoint}')
        print(f'{cls.URL}{endpoint}')
        return r.json()

    @classmethod
    # function to search for drugs by name
    def get_drugs(cls, value):
        '''
        input can be ingredient, brand name, clinical dose form, branded dose form, clinical
        drug component, branded drug component. Returns all associated drugs.
        Primary search component.
        '''
        if value is None:
            return {}
        else:
            endpoint = f'/REST/drugs.json?name={value}'
            return cls.make_request(endpoint)

    @classmethod
    # function to get the properties of a drug by RxNorm ID
    def get_rx_properties(cls, id):
        if id is None:
            return {"error": "possible generic drug"}
        else:
            endpoint = f'/REST/RxTerms/rxcui/{id}/allinfo.json'
            return cls.make_request(endpoint)



