## from base image
#FROM python:3-alpine3.18
#
#WORKDIR /app
#
#COPY . /app
#
#RUN pip install -r requirements.txt
#
#EXPOSE 5000
#
#CMD python ./run.py

FROM python:3.18

EXPOSE 5000

WORKDIR /app

COPY ./server/requirements.txt /app

RUN pip install -r requirements.txt

COPY ./server/*.py /app

CMD python app.py