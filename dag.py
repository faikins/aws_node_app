from airflow import DAG
from airflow.providers.vertica.operators.vertica import VerticaOperator
from datetime import datetime

default_args = {
    'owner': 'airflow',
    'start_date': datetime(2023, 9, 24),
    'retries': 1,
}

with DAG(dag_id='vertica_example',
         default_args=default_args,
         schedule_interval=None) as dag:

    run_vertica_query = VerticaOperator(
        task_id='run_vertica_query',
        vertica_conn_id='vertica_conn',
        sql='SELECT * FROM my_table'
    )

    run_vertica_query
