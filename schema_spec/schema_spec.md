# Schema Specification Format

schema files can be provided in JSON or YAML format. The below spec uses
the yaml format but, translating should be trivial. 

the below file lays out the spec. <> indicates a name you must provide 
and [] indicates an optional field. 
#### YAML
```
<table name>:
    fields:
        <column name>: 
            type: (string | integer | float | date | date_time | time | binary | enum | custom)
            [key: pri] 
            [sql: <sql>] # If of field is custom 
    relations:
        <relation name>:
            from: <from table name>
            to: <to table name>
            required_fields: <list of required fields from the "to" table>
            [type: (left | full)]
            [condition: <join condition sql>] 
    filters:
        <filter name>:
            sql: <filter sql>

... more table defintions ....
```

examples available in the `test_schema_files` directory