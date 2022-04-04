import { FunctionComponent, useEffect, useState } from "react";
import FilteredTable from "../components/Particles/FilteredTable";
import CRUD from "../utils/CRUD";
import fetchCampaignsAverages from "../utils/fetchCampaignsAverages";
import fetchInfluencersStats from "../utils/fetchInfluencerStats";

const HomePage: FunctionComponent = () => {
  const crud = new CRUD(process.env.REACT_APP_API_URL + "/campaigns/");

  const [topInfluencers, setTopInfluencers] = useState([]);
  const [worstInfluencers, setWorstInfluencers] = useState([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [averages, setAverages] = useState([]);
  const [campaignsByRevenue, setCampaignsByRevenue] = useState([]);

  const fetchCampaigns = async () => {
    const campaigns = await crud.readAll();
    setCampaigns(campaigns);
  };

  const fetchRevenues = async () => {
    const revenuesRequest = await fetch(
      process.env.REACT_APP_API_URL + "/campaigns/getRevenues"
    );
    const revenuesResponse = await revenuesRequest.json();

    setCampaignsByRevenue(revenuesResponse);
  };

  useEffect(() => {
    fetchInfluencersStats(10, "top", setTopInfluencers);
    fetchInfluencersStats(10, "worst", setWorstInfluencers);
    fetchCampaigns();
    fetchCampaignsAverages(setAverages);

    fetchRevenues();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className=" grid grid-cols-2 gap-4 ">
        <FilteredTable
          onFilterChange={(campaignId) =>
            fetchInfluencersStats(10, "top", setTopInfluencers, campaignId)
          }
          name="Top 10 influencers"
          filterOptions={
            campaigns &&
            campaigns.map((campaign: any) => {
              return { label: campaign.company, value: campaign.id };
            })
          }
          columns={[
            { label: "Instagram Username", key: "ig_id" },
            { label: "Views", key: "views" },
          ]}
          data={topInfluencers}
        />

        <FilteredTable
          name="Worst 10 influencers"
          onFilterChange={(campaignId) =>
            fetchInfluencersStats(10, "worst", setWorstInfluencers, campaignId)
          }
          filterOptions={
            campaigns &&
            campaigns.map((campaign: any) => {
              return { label: campaign.company, value: campaign.id };
            })
          }
          columns={[
            { label: "Instagram Username", key: "ig_id" },
            { label: "Views", key: "views" },
          ]}
          data={worstInfluencers}
        />
      </div>

      <FilteredTable
        pageLength={10}
        name="Average views per campaign"
        columns={[
          { label: "Company name", key: "company" },
          { label: "Average views", key: "average_views" },
        ]}
        data={averages?.map((avg: any) => {
          return {
            ...avg,
            average_views: parseFloat(avg.average_views).toFixed(2),
          };
        })}
      />

      {campaignsByRevenue?.length && (
        <FilteredTable
          pageLength={10}
          name="Average revenues per campaign"
          columns={[
            { label: "Company name", key: "company" },
            { label: "Revenues", key: "revenue" },
          ]}
          data={campaignsByRevenue}
        />
      )}
    </div>
  );
};

export default HomePage;
