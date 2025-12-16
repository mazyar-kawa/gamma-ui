import { AnimatedFolder } from "@/registry/gammaui/3d-folder"

const portfolioData = [
  {
    title: "Folder Name",
    projects: [
      {
        id: "1",
        image:
          "https://images.pexels.com/photos/29531041/pexels-photo-29531041.jpeg",
        title: "Tokyo",
      },
      {
        id: "2",
        image:
          "https://images.pexels.com/photos/569416/pexels-photo-569416.jpeg",
        title: "Berlin",
      },
      {
        id: "3",
        image:
          "https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg",
        title: "Pris",
      },
    ],
  },
]

export default function AnimatedFolderDemo() {
  return (
    <main className="bg-background flex w-full items-center justify-center">
      {/* Main content */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex w-full items-center justify-center">
          {portfolioData.map((folder) => (
            <AnimatedFolder
              key={folder.title}
              title={folder.title}
              projects={folder.projects}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
