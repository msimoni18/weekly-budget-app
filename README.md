# template-python-vite-ts

Template for building an application using `TypeScript` as the frontend and
`Flask` as the backend.

## Setup for development
Create the virtual environment:

```python3 -m venv venv```

Activate the virtual environment:

```source venv/bin/activate```

Install the requirements:

```pip install -r requirements.txt```

Start the development server. In separate terminals, run:

```flask run``` and  ```npm run dev```

## Setup for production

Build the production application:

```npm run build```

Start the production server:

```gunicorn -w 2 'app:app'```

To access the production server from a
remove device, run ```gunicorn -w 2 -b 0.0.0.0 'app:app'```.
Then navigate to the IP address of the remote
device with the port of the gunicorn server. To
find the ip address ```ifconfig | grep "inet"```.