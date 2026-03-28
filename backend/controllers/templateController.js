const TEMPLATES = [
    {
      id: "south-indian-classic",
      name: "Kanchipuram Classic",
      style: "Traditional Silk Aesthetic",
      badge: "Popular",
      desc: "Deep crimson & gold design",
      colors: ["#8B1A1A", "#C9953A", "#FAF6EF"],
      previewImage: null,
    },
    {
      id: "south-indian-lotus",
      name: "Lotus Bloom",
      style: "Floral Temple",
      badge: "Elegant",
      desc: "Purple & gold lotus theme",
      colors: ["#6B3A6E", "#C9953A", "#FBF0FF"],
      previewImage: null,
    },
  ];
  
  export const getTemplates = (req, res) => {
    res.json(TEMPLATES);
  };
  
  export const getTemplateById = (req, res) => {
    const template = TEMPLATES.find(t => t.id === req.params.id);
  
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }
  
    res.json(template);
  };