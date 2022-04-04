import { FunctionComponent, useEffect, useState } from "react";
import StoryForm from "../components/Forms/StoryForm";
import FilteredTable from "../components/Particles/FilteredTable";
import Modal from "../components/Particles/Modal";
import CRUD from "../utils/CRUD";
import { Story } from "../types/story.type";

const Stories: FunctionComponent = () => {
  const storiesCrud = new CRUD(process.env.REACT_APP_API_URL + "/stories/");

  const [stories, setStories] = useState<Story[]>([]);
  const [story, setSelectedStory] = useState<Story>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditingModalOpen, setEditingModalOpen] = useState(false);

  const columns = [
    {
      label: "ID",
      key: "id",
      onClick: async (value: any) => {
        const storyRef = await storiesCrud.readOne(value as number);
        setSelectedStory(storyRef);
        setEditingModalOpen(true);
      },
    },
    {
      label: "IG username",
      key: "ig_id",
    },

    {
      label: "Views",
      key: "views",
    },

    {
      label: "Swipes",
      key: "swipes",
    },
    {
      label: "Clicks",
      key: "clicks",
    },
  ];

  const createNewStory = async (story: Story) => {
    const newStory = await storiesCrud.create(story);

    setModalOpen(false);
    setStories([newStory, ...stories]);
  };

  const editCurrentStory = async (id: number, story: Story) => {
    await storiesCrud.update(id, story);

    setEditingModalOpen(false);
    setStories([
      ...stories.map((c: any) => (c.id === id ? { id, ...story } : c)),
    ]);
  };

  const deleteCurrentStory = async (id: number) => {
    await storiesCrud.delete(id);

    setEditingModalOpen(false);
    setStories(stories.filter((c: any) => c.id !== id));
  };

  const fetchStories = async () => {
    const stories = await storiesCrud.readAll();

    setStories(stories);
  };

  useEffect(() => {
    fetchStories();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      {isModalOpen && (
        <Modal onCancel={() => setModalOpen(false)}>
          <StoryForm onSubmit={(payload) => createNewStory(payload)} />{" "}
        </Modal>
      )}
      {isEditingModalOpen && story && (
        <Modal onCancel={() => setEditingModalOpen(false)}>
          <StoryForm
            onSubmit={(payload) => editCurrentStory(story.id!, payload)}
            onDelete={(id) => deleteCurrentStory(id)}
            story={story}
          />
        </Modal>
      )}
      <div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 text-white text-center font-bold bg-orange-500 hover:bg-orange-700"
        >
          New story
        </button>
      </div>
      <FilteredTable
        columns={columns}
        data={stories}
        name="Stories"
        pageLength={50}
      />
    </div>
  );
};

export default Stories;
