# entityQL
This is a simplistic REST-Entity query language used for searching entities from a REST-ful microservice.

Schemantic of Query Language(Example):
```
{
    "attributes": [  //Things to Select in return
        {
            "name": "xyz",
            "aggregateOperator": "count|Max|Min"
        }
    ],
    "creteria": {   //Where clause
        "attribute": "XYZ",
        "operator": "equal|notequal|lt|gt|in",
        "value": "",
        "and": {},  //You can have more similar clause objects in AND fashion.
        "or": {}    //You can have more similar clause objects in OR fashion.
    },
    "categorize": [ //Group By Clause
        {
            "name": "xyz"
        }
    ]
}
```
