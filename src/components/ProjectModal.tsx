interface Project {
  id: number;
  title: string;
  fullDescription: string;
  tags: string[];
  liveUrl: string;
}

interface Props {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: Props) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 modal-overlay" onClick={onClose}>
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl glass-card rounded-2xl p-8 md:p-12 modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-accent transition-colors text-2xl leading-none"
        >
          ×
        </button>

        <h2 className="font-orbitron text-2xl md:text-3xl font-bold mb-4 text-foreground">{project.title}</h2>
        <p className="font-body text-muted-foreground leading-relaxed mb-6">{project.fullDescription}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span key={tag} className="skill-pill px-3 py-1 rounded-full text-xs font-body text-accent">
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm btn-glow"
        >
          Visit Live Site →
        </a>
      </div>
    </div>
  );
};

export default ProjectModal;
