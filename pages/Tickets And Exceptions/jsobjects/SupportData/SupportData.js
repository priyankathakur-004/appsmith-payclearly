export default {
	// Shape ticket rows for ticketsTable (clean, identifier-safe keys)
	ticketsTransform() {
		// While the fetch is in flight, return [] so the table shows its loading
		// animation instead of a premature "no data" row.
		if (GetTickets.isLoading) {
			return [];
		}
		let items = GetTickets.data && GetTickets.data.items ? GetTickets.data.items : [];
		// Priority is filtered client-side: the sandbox API ignores the priority query param.
		const priority = ticketPrioritySelect.selectedOptionValue;
		if (priority) {
			items = items.filter(t => t.priority === priority);
		}
		return items.map(t => ({
			"ticketNumber": t.ticketNumber,
			"subject": t.subject,
			"status": t.status,
			"priority": t.priority,
			"category": t.category,
			"payment": t.paymentId,
			"requester": t.requesterName,
			"exceptions": t.exceptionCount,
			"created": t.createdAt ? moment(t.createdAt).format("DD MMM YYYY") : "",
			"lastActivity": t.lastActivityAt ? moment(t.lastActivityAt).format("DD MMM YYYY HH:mm") : "",
			"id": t.id,
		}));
	},

	// Shape exception rows for exceptionsTable (clean, identifier-safe keys)
	exceptionsTransform() {
		if (GetExceptions.isLoading) {
			return [];
		}
		const items = GetExceptions.data && GetExceptions.data.items ? GetExceptions.data.items : [];
		return items.map(e => ({
			"seq": e.sequence,
			"label": e.label,
			"state": e.state,
			"answered": e.isAnswered ? "Yes" : "No",
			"ticketNumber": e.ticketNumber,
			"ticketStatus": e.ticketStatus,
			"payment": e.paymentId,
			"created": e.createdAt ? moment(e.createdAt).format("DD MMM YYYY") : "",
			"updated": e.updatedAt ? moment(e.updatedAt).format("DD MMM YYYY") : "",
			"id": e.id,
		}));
	},
};
