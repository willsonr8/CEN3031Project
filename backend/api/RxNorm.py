import requests
import json


class Rx:
    URL = 'https://rxnav.nlm.nih.gov'

    @classmethod
    def make_request(cls, endpoint):
        r = requests.get(f'{cls.URL}{endpoint}')
        print(f'{cls.URL}{endpoint}')
        return r.json()

    @classmethod
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
    def get_rx_properties(cls, id):
        if id is None:
            return {"error": "possible generic drug"}
        else:
            endpoint = f'/REST/RxTerms/rxcui/{id}/allinfo.json'
            return cls.make_request(endpoint)



