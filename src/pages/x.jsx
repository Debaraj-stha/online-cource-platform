 <h2 className="text-gray-900">9806800001</h2>

      <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST" className="text-gray-900">
        <input type="hidden" id="amount" name="amount" value={paymentData.amount} required  readOnly/>
        <input type="hidden" id="tax_amount" name="tax_amount" value={paymentData.tax_amount} required readOnly />
        <input type="hidden" id="total_amount" name="total_amount" value={paymentData.total_amount} required readOnly />
        <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={paymentData.transaction_uuid} required readOnly />
        <input type="hidden" id="product_code" name="product_code" value={paymentData.product_code} required readOnly />
        <input type="hidden" id="product_service_charge" name="product_service_charge" value={paymentData.product_service_charge} required readOnly />
        <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value={paymentData.product_delivery_charge} required  readOnly/>
        <input type="hidden" id="success_url" name="success_url" value={paymentData.success_url} required readOnly />
        <input type="hidden" id="failure_url" name="failure_url" value={paymentData.failure_url} required />
        <input type="hidden" id="signed_field_names" className="bg-red-600" name="signed_field_names" value={paymentData.signed_field_names} required readOnly />
        <input type="hidden" id="signature" name="signature"  value= {paymentData.signature} required readOnly />
        <input value="Submit" type="submit"  className="bg-gray-900 text-white"/>
      </form>