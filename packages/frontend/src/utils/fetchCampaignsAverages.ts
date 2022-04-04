const fetchCampaignsAverages = async (cb: (response: any) => void) => {
  const request = await fetch(
    process.env.REACT_APP_API_URL + `/campaigns/average-views`
  );
  const response = await request.json();

  cb(response);
};

export default fetchCampaignsAverages;
