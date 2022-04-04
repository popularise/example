const fetchInfluencersStats = async (
  k: number,
  type: string,
  cb: Function,
  campaignId?: number
) => {
  const request = await fetch(
    process.env.REACT_APP_API_URL +
      `/campaigns/top-k-influencers?k=${k}&type=${type}${
        campaignId ? "&campaignId=" + campaignId : ""
      }`
  );

  const response = await request.json();
  cb(response);
};

export default fetchInfluencersStats;
