export default (id) => `
    <div id="oc-app-9h838q-${id}">
        <style>
        #oc-app-9h838q-${id} {
            border: 2px solid black;
            background-color: #DDD;
        }
        </style>
        <p>Hey welcome to OC!</p>
        <p id="message-9h838q-${id}"></p>
        <button id="oc-app-button-9h838q-${id}">Click here for magic!</button>
    </div>
    <script>
        document.getElementById('oc-app-button-9h838q-${id}').addEventListener('click', function() {
            document.getElementById('message-9h838q-${id}').innerText = 'TADA!';
        });
    </script>
` + `<script>alert('hello world fragment client');</script>`;