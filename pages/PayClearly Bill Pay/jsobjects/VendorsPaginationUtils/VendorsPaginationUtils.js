export default {

  // Get full next URL directly
  getNextLink() {
    return GetVendors.data?.links?.next || null;
  },

  // Call AFTER GetVendors.run()
  updateTokensAfterFetch() {
    const currentPageNumber = vendorsTable.pageNo;
    const nextLink = this.getNextLink();

    const history = appsmith.store.vendorPageLinkHistory || [];

    // Save full next link when moving forward
    if (nextLink && !history.includes(nextLink)) {
      history.push(nextLink);
    }

    // Forward link
    storeValue("vendorNextLink", nextLink);

    // Previous link logic
    const prevLink =
      currentPageNumber > 2
        ? history[currentPageNumber - 3]
        : `/v1/vendors${VendorsFiltersJS.buildQueryString()}`;

    storeValue("vendorPrevLink", prevLink);

    storeValue("vendorPageLinkHistory", history);
  },

  // Reset on filter/search change
  resetPagination() {
    storeValue("vendorNextLink", null);
    storeValue("vendorPrevLink", null);
    storeValue("vendorPageLinkHistory", []);
    resetWidget("vendorsTable", true);
  },

  handlePageChange() {
    const currentPage = vendorsTable.pageNo;
    const lastPage = appsmith.store.vendorLastPageNo || 1;

    storeValue("vendorLastPageNo", currentPage);

    if (currentPage > lastPage && !GetVendors.data?.links?.next) return;

    return GetVendors.run().then(() => {
      VendorsPaginationUtils.updateTokensAfterFetch();
    });
  }

};
