from flask import Flask, render_template_string, request, jsonify

app = Flask(__name__, static_folder='.', template_folder='.')

# serve the index.html directly
@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    # In a real app you'd save or email this information
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    print(f"Received contact from {name} <{email}>: {message}")
    return jsonify({'message': 'Thank you for contacting us, we will get back to you soon!'})

@app.route('/buy', methods=['POST'])
def buy():
    data = request.get_json()
    # Process order data
    order_date = data.get('orderDate')
    buyer_name = data.get('buyerName')
    product_name = data.get('productName')
    quantity = data.get('quantity')
    address = data.get('address')
    
    # In a real app you'd save this to a database or send an email
    print(f"New Order - Date: {order_date}, Name: {buyer_name}, Product: {product_name}, Quantity: {quantity}kg, Address: {address}")
    
    return jsonify({'message': 'Order placed successfully! We will contact you soon to confirm.'})

if __name__ == '__main__':
    app.run(debug=True)