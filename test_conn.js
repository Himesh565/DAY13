async function testConnectivity() {
    try {
        const res = await fetch('http://localhost:5000/api/orders/test');
        console.log("Status:", res.status);
        const text = await res.text();
        console.log("Body:", text);
    } catch (e) {
        console.error("Conn failed", e);
    }
}
testConnectivity();
