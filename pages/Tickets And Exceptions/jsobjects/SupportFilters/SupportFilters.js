export default {
	// Build the querystring for GetTickets from the ticket filter widgets
	buildTicketsQuery() {
		const params = [];
		const status = ticketStatusSelect.selectedOptionValue;
		const priority = ticketPrioritySelect.selectedOptionValue;
		if (status) params.push("status=" + status);
		if (priority) params.push("priority=" + priority);
		params.push("limit=50");
		return "?" + params.join("&");
	},

	// Build the querystring for GetExceptions from the exception filter widgets
	buildExceptionsQuery() {
		const params = [];
		const state = exceptionStateSelect.selectedOptionValue;
		const answered = exceptionAnsweredSelect.selectedOptionValue;
		if (state) params.push("state=" + state);
		if (answered === "answered") params.push("isAnswered=true");
		if (answered === "unanswered") params.push("isAnswered=false");
		params.push("limit=50");
		return "?" + params.join("&");
	},
};
