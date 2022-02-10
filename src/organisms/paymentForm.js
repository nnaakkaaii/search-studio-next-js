import {CardCvcElement, CardExpiryElement, CardNumberElement, Elements} from "@stripe/react-stripe-js";
import {FormControl} from "@mui/material";
import {styled} from "@mui/system";
import {forwardRef, useImperativeHandle, useRef} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {MyTextField} from "../atoms/searchTextField";

const StripeTextField = styled(MyTextField)({
    '& .MuiOutlinedInput-input': {
        padding: '10px 12px 6px',
    },
})

const MyInputComponent = forwardRef((props, ref) => {
    const { component: Component, inputRef, ...other } = props;
    const elementRef = useRef();
    // implement `InputElement` interface
    useImperativeHandle(inputRef, () => ({
        focus: () => {
            elementRef.current.focus()
        }
        // logic to focus the rendered component from 3rd party belongs here
        // hiding the value e.g. react-stripe-elements
    }));

    // `Component` will be your `SomeThirdPartyComponent` from below
    return <Component onReady={element => (elementRef.current = element)}
                      options={{
                          style: {
                              base: {
                                  color: '#5A4628',
                                  '::placeholder': {
                                      color: '#5A462850',
                                  }
                              },
                          }
                      }}
                      {...other} />;
});

MyInputComponent.displayName = "MyInputComponent"


function CardNumberForm() {
    return (
        <FormControl sx={{width: '100%', mt: '12px'}}>
            <legend>カード番号</legend>
            <StripeTextField
                name="number"
                InputProps={{
                    inputComponent: MyInputComponent,
                    inputProps: {
                        component: CardNumberElement,
                    },
                }}
            />
        </FormControl>
    )
}

function CardExpiryForm() {
    return (
        <FormControl sx={{width: '100%'}}>
            <legend>有効期限</legend>
            <StripeTextField
                name="expiry" sx={{m: '0 auto', width: '92%'}}
                InputProps={{
                    inputComponent: MyInputComponent,
                    inputProps: {
                        component: CardExpiryElement,
                    },
                }}
            />
        </FormControl>
    )
}

function CardCvcForm() {
    return (
        <FormControl sx={{width: '100%'}}>
            <legend>セキュリティコード</legend>
            <StripeTextField
                name="cvc" sx={{m: '0 auto', width: '92%'}}
                InputProps={{
                    inputComponent: MyInputComponent,
                    inputProps: {
                        component: CardCvcElement
                    },
                }}
            />
        </FormControl>
    )
}

export default function PaymentForm() {
    const stripePromise = loadStripe('pk_test_51KMLaFD7umdkQdDRzwKFQAQFgnLCb4APmbZLkon3yI68qPX32310PmmAkD378KwPU1aEvmtrvVvNkvb6VWnAVXqf00n5ttH4W3');

    return (
        <>
            <Elements stripe={stripePromise}><CardNumberForm/></Elements>
            <div style={{display: 'flex', marginTop: 12}}>
                <Elements stripe={stripePromise}><CardExpiryForm/></Elements>
                <Elements stripe={stripePromise}><CardCvcForm/></Elements>
            </div>
        </>
    )
}