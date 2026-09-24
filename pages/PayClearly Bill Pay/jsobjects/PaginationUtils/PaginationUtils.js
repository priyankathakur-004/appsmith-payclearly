export default {

  // Get full next URL directly
  getNextLink() {
    return GetPayments.data?.links?.next || null;
  },

  // Call AFTER GetPayments.run()
  updateTokensAfterFetch() {
    const currentPageNumber = paymentTable.pageNo;
    const nextLink = this.getNextLink();

    const history = appsmith.store.pageLinkHistory || [];

    // Save full next link when moving forward
    if (nextLink && !history.includes(nextLink)) {
      history.push(nextLink);
    }

    // Forward link
    storeValue("nextLink", nextLink);

    // Previous link logic
    const prevLink =
      currentPageNumber > 2
        ? history[currentPageNumber - 3]
        : `/v1/payments${PaymentsFiltersJS.buildQueryString()}`;

    storeValue("prevLink", prevLink);

    storeValue("pageLinkHistory", history);
  },

  // Reset on filter/search change
  resetPagination() {
    storeValue("nextLink", null);
    storeValue("prevLink", null);
    storeValue("pageLinkHistory", []);
    resetWidget("paymentTable", true);
  },
	
	handlePageChange() {
    const currentPage = paymentTable.pageNo;
    const lastPage = appsmith.store.lastPageNo || 1;
		storeValue("lastPageNo", currentPage);
		
    if (currentPage > lastPage && !GetPayments.data?.links?.next) return;
    
    return GetPayments.run().then(() => {
			PaginationUtils.updateTokensAfterFetch();
		});
  }

};
