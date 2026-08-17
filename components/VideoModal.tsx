export function VideoModal({ videoUrl, onClose }: { videoUrl: string; onClose: () => void }) {
  const embedUrl = videoUrl.replace("/share/", "/embed/");

  return (
    <div className="project-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="video-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Project demo video"
      >
        <button type="button" className="video-modal-close" aria-label="Close video" onClick={onClose}>
          ×
        </button>
        <div className="video-modal-frame">
          <iframe src={embedUrl} allow="fullscreen; picture-in-picture" allowFullScreen />
        </div>
      </div>
    </div>
  );
}
