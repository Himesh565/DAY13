async function testOrder() {
    try {
        const email = `test${Date.now()}@test.com`;
        console.log(`1. Registering user ${email}...`);

        const regRes = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Agent',
                email: email,
                password: 'password123',
                phone: '9998887776'
            })
        });

        const regData = await regRes.json();

        if (!regRes.ok) {
            throw new Error(`Registration failed: ${JSON.stringify(regData)}`);
        }

        const token = regData.token;
        console.log("Registered & Logged in. Token:", token ? "Yes" : "No");

        console.log("2. Creating Order...");
        const orderData = {
            items: [{
                productId: "dummy_id_123",
                quantity: 1,
                price: 500,
                title: "Test Product",
                imageUrl: "http://example.com/img.jpg"
            }],
            subtotal: "500.00",
            tax: "50.00",
            total: "550.00",
            shippingAddress: {
                fullName: "Test User",
                email: "test@example.com",
                phone: "1234567890",
                address: "123 Test St",
                city: "Test City",
                state: "Test State",
                zipCode: "12345",
                country: "India"
            },
            paymentMethod: "card",
            paymentDetails: {
                cardNumber: "1234123412341234",
                cardName: "Test User"
            }
        };

        const orderRes = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });

        const orderResponseData = await orderRes.json();

        console.log("Order Status:", orderRes.status);
        if (!orderRes.ok) {
            console.log("Error Body:", JSON.stringify(orderResponseData, null, 2));
        } else {
            console.log("Success Body:", JSON.stringify(orderResponseData, null, 2));
        }

    } catch (error) {
        console.error("Test Script Error:", error);
    }
}

testOrder();
