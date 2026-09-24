export default {
	paymentsTransform() {
		let data = GetPayments.data.data || [];
		if ((SelectVendor.selectedOptionValue ||  TransactionIdInput.text != '') && getFilteredPayments.data) {
			data = getFilteredPayments.data?.data || [];
		}
		if (!data.length) {
			return [
				 { Message: "No records found" }
			];
		}
		return data.map(item => ({
			"DueYear": new Date(item.customFields["Due Date"]).getFullYear(),
			"DueMonth": new Date(item.customFields["Due Date"]).getMonth() + 1,
			"DueDay": new Date(item.customFields["Due Date"]).getDate(),
			"batchID": item.batchId,

			"Status": item.status,
			"Created": new Date(item.createdAt),
			"Funded": item.fundedAt ? new Date(item.fundedAt) : null,
			"Verified": item.verifiedAt ? new Date(item.verifiedAt) : null,

			"Client": item.vendorDisplayName + ' (' + item.vendorId + ')',
			"Vendor": item.vendorDisplayName + ' (' + item.vendorId + ')',
			"Amount": item.amount,
			"Method": item.method,
			"By": item.createdBy,
			"Linked": item.linked,
			"Ref": item.refNumber ? 'P_'+ item.refNumber : '-',
			"SubmittedDate": new Date(item.sentAt),

			"AccountNumber": item.customFields["Account Number"] || '',
			"BasePaymentAmount": item.customFields["Base Payment Amount"] || '',
			"BillID": item.customFields["Bill ID"]  || '',
			"DateProcessedInUBM": item.customFields["Date Processed in UBM"]  || '',
			"DueDate": item.customFields["Due Date"]  || '',
			"EmergencyPayment": item.customFields["Emergency Payment"]  || '',
			"InvoiceDate": item.customFields["Invoice Date"]  || '',
			"InvoiceNumber": item.customFields["Invoice Number"]  || '',
			"PearBatchReference": item.customFields["Pear Batch Reference"]  || '',
			"PearVendorReference": item.customFields["Pear Vendor Reference"]  || '',
			"PostCode1": item.customFields["Post Code 1"]  || '',
			"PostCode2": item.customFields["Post Code 2"]  || '',
			"ServiceAddress1": item.customFields["Service Address 1"]  || '',
			"ServiceAddress2": item.customFields["Service Address 2"]  || '',

			"UBMBillID": item.customFields["UBM Bill ID"]  || '',
			"UBMCustomerID": item.customFields["UBM Customer ID"]  || '',
			"UBMCustomerName": item.customFields["UBM Customer Name"]  || '',

			"PayClearlyId": item.id
		}));
	},
	
	vendorsTransform() {
			let data = GetVendors.data?.data || [];

			if (!data.length) {
				return [
					{ Message: "No records found" }
				];
			}

			return data.map(item => ({
				"VendorName": item.displayName,
				//"VendorID": item.id,

				"ACH": item.ACH ? "TRUE" : "FALSE",
				"VCard": item.vCard ? "TRUE" : "FALSE",
				"Check": item.check ? "TRUE" : "FALSE",
				"Active": item.active,
				"CreatedAt": item.createdAt ? new Date(item.createdAt) : null,
			}));
	},

};
