export default {
	buildQueryString() {
		const baseDates = {
			createdAtStart: createdAtStart?.formattedDate,
			createdAtEnd: createdAtEnd?.formattedDate,
			fundedAtStart: fundedAtStart?.formattedDate,
			fundedAtEnd: fundedAtEnd?.formattedDate,
			verifiedAtStart: verifiedAtStart?.formattedDate,
			verifiedAtEnd: verifiedAtEnd?.formattedDate,
			limit: 50,
		};

		const extraFilters = {
			batchId: BatchIdInput.text,
			status: SelectStatus.selectedOptionValue,
			paymentMethod: SelectPaymentMethod.selectedOptionValue,
		};

		const params = paymentTabs.selectedTab !== "Customer Payments"
		? baseDates
		: { ...baseDates, ...extraFilters };

		const query = Object.entries(params)
		.filter(([_, value]) => value !== undefined && value !== null && value !== "")
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join("&");

		return query ? `?${query}` : "";
	},

	applyFilters() {
		if (paymentTabs.selectedTab != "Customer Payments" && paymentTabs.selectedTab != "Vendor Summary") {
			return getPaymentsSummary.run();
		}
		
		if (!createdAtStart.selectedDate || !createdAtEnd.selectedDate) {
			resetWidget("SelectVendor", true);
			resetWidget("TransactionIdInput", true);
		}

		if (paymentTabs.selectedTab == "Vendor Summary") {
			VendorsPaginationUtils.resetPagination();
			GetVendors.run();
			VendorsPaginationUtils.updateTokensAfterFetch();
		} else {
			PaginationUtils.resetPagination();
			if (SelectVendor.selectedOptionValue || TransactionIdInput.text != '') {
				getFilteredPayments.run();
			} else {
				GetPayments.run();
				PaginationUtils.updateTokensAfterFetch();
			}
			
		}
	},
	
	handleTabChange() {
		this.applyFilters();
	},
	
	getVendorOptions() {
		const data =
			getAllVendors.data?.data?.length
				? getAllVendors.data.data
				: GetVendors.data?.data || [];

		const uniqueMap = new Map();

		data.forEach(obj => {
			if (!uniqueMap.has(obj.id)) {
				uniqueMap.set(obj.id, {
					label: obj.displayName ? obj.displayName + ' - ' + obj.id : obj.id,
					value: obj.id
				});
			}
		});

		return Array.from(uniqueMap.values());
	}

	
}
