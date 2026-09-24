export default {
	// Shape ticket rows for ticketsTable
	ticketsTransform() {
		const items = GetTickets.data && GetTickets.data.items ? GetTickets.data.items : [];
		if (!items.length) {
			return [{ Message: "No tickets found" }];
		}
		return items.map(t => ({
			"Ticket #": t.ticketNumber,
			"Subject": t.subject,
			"Status": t.status,
			"Priority": t.priority,
			"Category": t.category,
			"Payment": t.paymentId,
			"Requester": t.requesterName,
			"Exceptions": t.exceptionCount,
			"Created": t.createdAt ? moment(t.createdAt).format("DD MMM YYYY") : "",
			"Last Activity": t.lastActivityAt ? moment(t.lastActivityAt).format("DD MMM YYYY HH:mm") : "",
			"id": t.id,
		}));
	},

	// Shape exception rows for exceptionsTable
	exceptionsTransform() {
		const items = GetExceptions.data && GetExceptions.data.items ? GetExceptions.data.items : [];
		if (!items.length) {
			return [{ Message: "No exceptions found" }];
		}
		return items.map(e => ({
			"Seq": e.sequence,
			"Label": e.label,
			"State": e.state,
			"Answered": e.isAnswered ? "Yes" : "No",
			"Ticket #": e.ticketNumber,
			"Ticket Status": e.ticketStatus,
			"Payment": e.paymentId,
			"Created": e.createdAt ? moment(e.createdAt).format("DD MMM YYYY") : "",
			"Updated": e.updatedAt ? moment(e.updatedAt).format("DD MMM YYYY") : "",
			"id": e.id,
		}));
	},

	// Message thread for the ticket detail modal
	ticketMessagesTransform() {
		const items = GetTicket.data && GetTicket.data.messages ? GetTicket.data.messages : [];
		return items.map(m => ({
			"From": m.sender,
			"Name": m.sentByName,
			"Message": m.body,
			"Sent": m.sentAt ? moment(m.sentAt).format("DD MMM YYYY HH:mm") : "",
			"Attachments": m.hasAttachments ? (m.attachments ? m.attachments.length : "Yes") : "-",
		}));
	},

	// Exception items linked to the ticket, for the ticket detail modal
	ticketExceptionsTransform() {
		const items = GetTicket.data && GetTicket.data.exceptionItems ? GetTicket.data.exceptionItems : [];
		return items.map(e => ({
			"Seq": e.sequence,
			"Label": e.label,
			"State": e.state,
			"Answered": e.isAnswered ? "Yes" : "No",
			"Answered At": e.answeredAt ? moment(e.answeredAt).format("DD MMM YYYY") : "-",
			"Created": e.createdAt ? moment(e.createdAt).format("DD MMM YYYY") : "-",
		}));
	},
};
