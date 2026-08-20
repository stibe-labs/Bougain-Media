import Image from "next/image";

type ServiceMediaProps = {
  title: string;
  image?: string;
  video?: string;
  sizes: string;
};

export function ServiceMedia({ title, image, video, sizes }: ServiceMediaProps) {
  if (video) {
    return (
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes={sizes}
            className="object-cover"
          />
        )}
        <video
          ref={(el) => {
            if (el) {
              el.muted = true;
              el.defaultMuted = true;
              el.setAttribute("playsinline", "true");
              el.setAttribute("webkit-playsinline", "true");
              const p = el.play();
              if (p !== undefined) p.catch(() => {});
            }
          }}
          autoPlay
          muted
          loop
          playsInline
          poster={image}
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          aria-label={title}
        >
          <source src={video.replace(/\.(webm|mp4)$/i, ".mp4")} type="video/mp4" />
          <source src={video.replace(/\.(webm|mp4)$/i, ".webm")} type="video/webm" />
        </video>
      </div>
    );
  }

  if (!image) return null;

  return (
    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
      <Image
        src={image}
        alt={title}
        fill
        sizes={sizes}
        className="object-cover transition-[filter] duration-700 ease-out group-hover:brightness-110"
      />
    </div>
  );
}
