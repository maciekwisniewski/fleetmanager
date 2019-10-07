# fleetmanager

## Start virtual environemnt:

```json
python3 -m venv env
source ./env/bin/activate
```

## Install dependencies:

```json
pip3 install -r requirements.txt
npm install
```

## Build frontend:

```json
npm run dev
```

## Configure database and run:

```json
python manage.py migrate
python manage.py runserver
```
