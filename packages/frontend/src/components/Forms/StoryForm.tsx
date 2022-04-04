import { FunctionComponent, useEffect, useState } from "react";
import Select from "react-select";
import CRUD from "../../utils/CRUD";
import { Campaign } from "../../types/campaign.type";
import { Story } from "../../types/story.type";

interface IProps {
  onSubmit: (values: Story) => void;
  onDelete?: (id: number) => void;
  story?: Story;
}

const StoryForm: FunctionComponent<IProps> = ({
  onSubmit,
  story,
  onDelete,
}) => {
  const [igId, setIgId] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [clicks, setClicks] = useState<number>(0);
  const [swipes, setSwipes] = useState<number>(0);
  const [views, setViews] = useState<number>(0);
  const [selectedCampaign, setSelectedCampaign] = useState<
    { label: string; value: string } | undefined
  >();
  const [campaigns, setCampaigns] = useState<Campaign[]>();

  const campaignCRUD = new CRUD(process.env.REACT_APP_API_URL + "/campaigns/");

  const fetchCampaigns = async () => {
    const campaignsRef = await campaignCRUD.readAll();

    setCampaigns(campaignsRef);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    if (story) {
      setId(story.id!);
      setIgId(story.ig_id);
      setClicks(story.clicks);
      setSwipes(story.swipes);
      setViews(story.views);
      setSelectedCampaign({
        label: story.campaign!.company,
        value: story.campaign!.id.toString(),
      });
    }
  }, [story]);

  if (story) {
    if (!selectedCampaign) return <p>Loading...</p>;
  }

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-row gap-2  items-center">
        <div>
          <label className="block text-gray-700 text-sm font-bold ">
            IG Username
          </label>
          <input
            defaultValue={igId}
            type="text"
            onChange={(e) => setIgId(e.target.value)}
            className="p-2  bg-gray-100 rounded-md"
            placeholder="Instagram username"
          />
        </div>
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-bold ">
            Company
          </label>
          <Select
            options={campaigns?.map(
              (c: any) => ({ label: c.company, value: c.id } as any)
            )}
            className="w-full"
            defaultValue={selectedCampaign}
            onChange={(value) => setSelectedCampaign(value!)}
          />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div>
          <label className="block text-gray-700 text-sm font-bold ">
            Clicks
          </label>
          <input
            type="number"
            placeholder="Clicks"
            min={0}
            value={clicks}
            onChange={(e) => setClicks(parseInt(e.target.value))}
            className="p-2  bg-gray-100 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold ">
            Swipes
          </label>
          <input
            type="number"
            placeholder="Swipes"
            min={0}
            value={swipes}
            onChange={(e) => setSwipes(parseInt(e.target.value))}
            className="p-2  bg-gray-100 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold ">
            Views
          </label>
          <input
            type="number"
            placeholder="views"
            min={0}
            value={views}
            onChange={(e) => setViews(parseInt(e.target.value))}
            className="p-2  bg-gray-100 rounded-md"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center gap-2">
        <button
          type="button"
          onClick={() =>
            onSubmit({
              ig_id: igId,
              clicks,
              swipes,
              views,
              campaignId: selectedCampaign?.value as unknown as number,
            })
          }
          className="px-4 py-2 text-white text-center font-bold bg-orange-500 hover:bg-orange-700"
        >
          {(story ? "Edit" : "Create") + " story"}
        </button>
        {onDelete && story && (
          <button
            type="button"
            onClick={() => onDelete(story.id!)}
            className="px-4 py-2 text-white text-center font-bold bg-red-500 hover:bg-orange-700"
          >
            Delete Story
          </button>
        )}
      </div>
    </form>
  );
};

export default StoryForm;
