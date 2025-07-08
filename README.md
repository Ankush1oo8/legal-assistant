# Lexi Legal Assistant - Frontend Interface

A minimal frontend interface for a legal assistant that allows users to ask legal questions, receive AI-generated answers, and view citations from legal documents with clickable links to original PDFs.

## Features

- **Chat Interface**: ChatGPT-like interface for natural conversation flow
- **Legal Q&A**: Ask legal questions and receive detailed answers
- **Citation System**: View citations from legal documents with source information
- **PDF Integration**: Click citations to open original PDFs in new tabs
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Visual feedback during answer generation
- **Simulated API**: No backend required - uses simulated responses
- **Dark Mode Support**: Toggle between light and dark themes with system preference detection

## Tech Stack

- **React.js** (Next.js 14 with App Router)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components for consistent UI
- **Lucide React** for icons
- **next-themes** for dark mode implementation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/Ankush1oo8/legal-assistant.git
cd legal-assistant
\`\`\`

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

1. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

1. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Example Query
Try this sample legal question:

> "In a motor accident claim where the deceased was self-employed and aged 54–55 years at the time of death, is the claimant entitled to an addition towards future prospects in computing compensation under Section 166 of the Motor Vehicles Act, 1988? If so, how much?"

### Features Demonstrated

1. **Question Input**: Type your legal question in the textarea
2. **Answer Generation**: Receive a detailed legal answer with loading animation
3. **Citations Display**: View citations below the answer with source information
4. **PDF Access**: Click on citations to open a modal with PDF link
5. **Document Navigation**: PDF opens in new tab (simulated paragraph highlighting)

## Dark Mode

The application supports both light and dark themes:

- **System Default**: Automatically matches your system preference
- **Manual Toggle**: Click the sun/moon icon in the header to switch themes
- **Persistence**: Theme preference is saved and restored on page reload

### Theme Implementation

- Uses `next-themes` for seamless theme switching
- Tailwind CSS dark mode classes for styling
- Smooth transitions between themes
- Accessible theme toggle button with proper ARIA labels

## Citation Handling

The application handles citations through:

1. **Citation Display**: Citations appear as clickable cards below answers
2. **Modal Popup**: Clicking a citation opens a detailed modal
3. **PDF Integration**: Direct links to legal documents
4. **Source Attribution**: Clear labeling of document sources and paragraph references
5. **Accessibility**: Proper ARIA labels and keyboard navigation

### Citation Data Structure
\`\`\`typescript
interface Citation {
  text: string      // The quoted text from the document
  source: string    // PDF filename
  link: string    // URL to the PDF document
  paragraph?: string // Paragraph reference (e.g., "Para 7")
}
\`\`\`

## API Simulation

The app simulates API responses without requiring a backend:

\`\`\`typescript
const simulatedResponse = {
  answer: "Legal answer text...",
  citations: [
    {
      text: "Citation text from document...",
      source: "Document_Name.pdf",
      link: "https://document-url.com",
      paragraph: "Para 7"
    }
  ]
}
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Main chat interface
│   └── globals.css        # Global styles
├── components/
│   └── ui/                # shadcn/ui components
├── lib/
│   └── utils.ts          # Utility functions
├── README.md
└── package.json
\`\`\`

## Screenshots

### Main Interface
![Main Interface](screenshot-main.png)
*Chat interface with legal question and answer*

### Citation Modal
![Citation Modal](screenshot-citation.png)
*Citation details modal with PDF link*

## Deployment

The application can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

### Deploy to Vercel
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

## Future Enhancements

- Real backend integration with legal document database
- PDF viewer with in-app document display
- Text highlighting within PDFs
- Advanced search and filtering
- User authentication and chat history
- Multiple citation sources per answer
- Export functionality for legal research

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, contact: hi@lexi.sg

---

**Team Lexi** - Building the future of legal technology
