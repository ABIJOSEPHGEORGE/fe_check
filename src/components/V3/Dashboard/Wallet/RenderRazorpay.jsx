import { useContext, useEffect, useRef } from 'react';
import { authorizePayment, paymentStatus } from '../../../../apis/wallet';
import { toast } from 'react-toastify';
import UserStore from '../../../../contexts/UserStore';

const loadScript = src => new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      console.log('razorpay loaded successfully');
      resolve(true);
    };
    script.onerror = () => {
      console.log('error in loading razorpay');
      resolve(false);
    };
    document.body.appendChild(script);
  });

const RenderRazorpay = ({
    orderId,
    keyId,
    currency,
    amount,
    // transactionInfo,
}) => {

    const { setUser } = useContext(UserStore);

    const paymentId = useRef(null);
    const paymentMethod = useRef(null);

    const displayRazorpay = async (options) => {
        const res = await loadScript(
          'https://checkout.razorpay.com/v1/checkout.js',
        );
    
        if (!res) {
          console.log('Razorpay SDK failed to load. Are you online?');
          return;
        }
        const rzp1 = new window.Razorpay(options);
    
        // If you want to retreive the chosen payment method.
        rzp1.on('payment.submit', (response) => {
          console.log('paym,ent success', response)
          paymentMethod.current = response.method;
        });
    
        // To get payment id in case of failed transaction.
        rzp1.on('payment.failed', (response) => {
          console.log('payment failed')
          paymentId.current = response.error.metadata.payment_id;
        });
    
        // to open razorpay checkout modal.
        rzp1.open();
      };

       // informing server about payment
        const handlePayment = async (status, orderDetails = {}) => {
            const { orderId, paymentId } = orderDetails;
            const res = await paymentStatus({
              status,
              paymentMethod: paymentMethod.current,
              orderId,
              paymentId,
            });
            
            if(res && status === 'success'){
              toast.success('Payment successfull');
              setUser(res);
              // transactionInfo();
            };
        };

        const options = {
          key: keyId,
          amount,
          currency,
          name: 'Couple Squad',
          // image, // custom logo  url
          order_id: orderId,
          // This handler menthod is always executed in case of succeeded payment
          handler: (response) => {
            paymentId.current = response.razorpay_payment_id;
            // Most important step to capture and authorize the payment. This can be done of Backend server.
            const succeeded = (async() => {
              const res = await authorizePayment({ orderId, paymentId: response.razorpay_payment_id, signature: response.razorpay_signature});
              return res;
            })();
     
            // If successfully authorized. Then we can consider the payment as successful.
            if (succeeded) {
              handlePayment('success', {
                orderId,
                paymentId: paymentId.current,
                signature: response.razorpay_signature,
              });
            } else {
              handlePayment('failed', {
                orderId,
                paymentId: response.razorpay_payment_id,
              });
            }
          },
          modal: {
            confirm_close: true,
            // This function is executed when checkout modal is closed
            // There can be 3 reasons when this modal is closed.
            ondismiss: async (reason) => {
              const {
                reason: paymentReason, field, step, code,
              } = reason && reason.error ? reason.error : {};
              // Reason 1 - when payment is cancelled. It can happend when we click cross icon or cancel any payment explicitly. 
              if (reason === undefined) {
                console.log('cancelled');
                handlePayment('Cancelled');
              } 
              // Reason 2 - When modal is auto closed because of time out
              else if (reason === 'timeout') {
                console.log('timedout');
                handlePayment('timedout');
              } 
              // Reason 3 - When payment gets failed.
              else {
                console.log('failed');
                handlePayment('failed', {
                  paymentReason, field, step, code,
                });
              }
            },
          },
          retry: {
            enabled: false,
          },
          timeout: 900,
          // theme: {
          //   color: '', 
          // },
        };

        useEffect(() => {
            displayRazorpay(options);
        }, [options])

        return null;
};

export default RenderRazorpay;