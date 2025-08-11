import React, { useState } from 'react';

const categories = [
  'Education',
  'Health',
  'Disaster Relief',
  'Environment',
  'Animal Welfare',
  'Other',
];

const CreateCampaignPage = () => {
  const [campaign, setCampaign] = useState({
    title: '',
    description: '',
    goal: '',
    startDate: '',
    endDate: '',
    category: '',
    image: null,
    imagePreview: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaign((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCampaign((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !campaign.title.trim() ||
      !campaign.description.trim() ||
      !campaign.goal ||
      !campaign.startDate ||
      !campaign.endDate ||
      !campaign.category
    ) {
      alert('Please fill in all required fields');
      return;
    }

    if (new Date(campaign.startDate) > new Date(campaign.endDate)) {
      alert('End date must be after start date');
      return;
    }

    // Retrieve existing campaigns from localStorage
    const existing = JSON.parse(localStorage.getItem('campaigns')) || [];

    // Prepare new campaign object
    const newCampaign = {
      id: Date.now(),
      title: campaign.title.trim(),
      description: campaign.description.trim(),
      goal: parseFloat(campaign.goal),
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      category: campaign.category,
      raised: 0,
      status: 'Active',
      // For demo, store image preview URL (in real apps upload separately)
      imagePreview: campaign.imagePreview,
    };

    // Save updated campaigns
    localStorage.setItem('campaigns', JSON.stringify([...existing, newCampaign]));

    alert('Campaign created successfully!');

    // Reset form
    setCampaign({
      title: '',
      description: '',
      goal: '',
      startDate: '',
      endDate: '',
      category: '',
      image: null,
      imagePreview: null,
    });
  };

  return (
    <div>
      <h2>Create Campaign</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <label>
          Title*:
          <input
            type="text"
            name="title"
            value={campaign.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description*:
          <textarea
            name="description"
            value={campaign.description}
            onChange={handleChange}
            rows={5}
            required
          />
        </label>

        <label>
          Goal Amount*:
          <input
            type="number"
            name="goal"
            min="1"
            value={campaign.goal}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Start Date*:
          <input
            type="date"
            name="startDate"
            value={campaign.startDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          End Date*:
          <input
            type="date"
            name="endDate"
            value={campaign.endDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category*:
          <select
            name="category"
            value={campaign.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label>
          Campaign Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        {campaign.imagePreview && (
          <div style={{ margin: '1rem 0' }}>
            <strong>Image Preview:</strong>
            <br />
            <img
              src={campaign.imagePreview}
              alt="Campaign"
              style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
            />
          </div>
        )}

        <button type="submit" style={{ marginTop: '1rem' }}>
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default CreateCampaignPage;
