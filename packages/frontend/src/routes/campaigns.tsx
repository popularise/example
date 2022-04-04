import { FunctionComponent, useEffect, useState } from "react";
import CampaignForm from "../components/Forms/CampaignForm";
import FilteredTable from "../components/Particles/FilteredTable";
import Modal from "../components/Particles/Modal";
import CRUD from "../utils/CRUD";

const Campaigns: FunctionComponent = () => {
  const crud = new CRUD(process.env.REACT_APP_API_URL + "/campaigns/");
  const columns = [
    {
      label: "ID",
      key: "id",
      onClick: async (value: any) => {
        const campaignRef = await crud.readOne(value as number);
        setSelectedCampaign(campaignRef);
        setEditingModalOpen(true);
      },
    },
    {
      label: "Company",
      key: "company",
    },

    { label: "Open", key: "open" },
  ];

  const [campaigns, setCampaigns] = useState<
    { company: string; open: boolean }[]
  >([]);
  const [campaign, setSelectedCampaign] =
    useState<{ company: string; open: boolean; id: number }>();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditingModalOpen, setEditingModalOpen] = useState(false);

  const createNewCampaign = async (campaign: {
    company: string;
    open: boolean;
  }) => {
    const newCampaign = await crud.create(campaign);
    setModalOpen(false);
    setCampaigns([newCampaign, ...campaigns]);
  };

  const editCurrentCampaign = async (
    id: number,
    campaign: { company: string; open: boolean }
  ) => {
    await crud.update(id, campaign);

    setEditingModalOpen(false);
    setCampaigns([
      ...campaigns.map((c: any) => (c.id === id ? { id, ...campaign } : c)),
    ]);
  };

  const deleteCurrentCampaign = async (id: number) => {
    await crud.delete(id);
    setEditingModalOpen(false);
    setCampaigns(campaigns.filter((c: any) => c.id !== id));
  };

  const fetchCampaigns = async () => {
    const campaigns = await crud.readAll();
    setCampaigns(campaigns);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      {isModalOpen && (
        <Modal onCancel={() => setModalOpen(false)}>
          <CampaignForm onSubmit={(payload) => createNewCampaign(payload)} />{" "}
        </Modal>
      )}

      {isEditingModalOpen && campaign && (
        <Modal onCancel={() => setEditingModalOpen(false)}>
          <CampaignForm
            onSubmit={(payload) => editCurrentCampaign(campaign.id, payload)}
            onDelete={(id) => deleteCurrentCampaign(id)}
            campaign={campaign}
          />{" "}
        </Modal>
      )}
      <div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 text-white text-center font-bold bg-orange-500 hover:bg-orange-700"
        >
          New campaign
        </button>
      </div>

      <FilteredTable columns={columns} data={campaigns} name="Campaigns" />
    </div>
  );
};

export default Campaigns;
