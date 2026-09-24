export default {

	updateKey() {
		// Get the selected organization from the dropdown
		const selectedOrg = OrganizationSelect.selectedOptionValue; // or selectedOptionLabel

		// Find the API key from your organization mapping
		const orgData = getMappingOrganizations.data.find(r => r.organizationid === selectedOrg);

		if (orgData && orgData.apikey) {
			// Store API key in Appsmith store for global use
			storeValue("currentApiKey", orgData.apikey);
			GetAccounts.run()
			return orgData.apikey; // optional: return key
		} else {
			// Handle case when API key is missing
			storeValue("currentApiKey", "");
			return "";
		}
	}
}
