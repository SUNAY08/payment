const payButton = document.getElementById('pay-button');

payButton.onclick = function (e) {
  const url = "http://localhost:5000/payment/checkout";
  const body = JSON.stringify({
    amount: 9 * 100,
    currency: "INR",
  });
  fetch(url, {
    method: "POST",
    headers: {
      accept: "application.json",
      "content-Type": "application/json",
    },
    body: body,
  })
    .then(async function (response) {
      const data = await response.json();
      console.log("data", data);

      var options = {
        key: "rzp_test_exoqdZoZKq72aK", // Enter the Key ID generated from the Dashboard
        amount: "9*100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Nike",
        description: "Nike Airmax 2022 Limited Edition Holy Water",
        image: "https://example.com/your_logo",
        order_id: data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          verifyPayment(response);
        },
        prefill: {
          name: "sunil",
          email: "sunil@example.com",
          contact: "8979810308",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      console.log("options", options);
      var razorpayObject = new Razorpay(options);
      console.log(razorpayObject, "bbbbbbbbbbbbbbbbb");
      razorpayObject.on("payment.failed", function (response) {
        console.log(response, "response");
        alert("Payment Failed");
      });

      razorpayObject.open();

      function verifyPayment(response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", response);

        const url = "http://localhost:5000/payment/verify";
        const body = JSON.stringify(response);
        fetch(url, {
          method: "POST",
          headers: {
            accept: "application.json",
            "content-Type": "application/json",
          },
          body: body,
        })
          .then(async function (response) {
            let result = await response.json();
            console.log("result116", result);
            alert(result.message);
          })
          .catch((err) => alert("payment failed"));
      }
    })
    .catch(function (err) {
      console.error(err, "err");
    });
  e.preventDefault();
};
