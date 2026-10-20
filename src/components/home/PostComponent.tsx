import { useEffect, useState } from "react";
import type { RootObject, SectionsHomeAbout } from "../../interfaces/dbData";

interface PostComponentProps {
  dataBlocks: SectionsHomeAbout[];
  data: RootObject;
}

const PostComponent: React.FC<PostComponentProps> = ({ dataBlocks, data }) => {
  /* ================= HELPERS (Lógica intacta) ================= */
  const has = (b: SectionsHomeAbout, k: string) =>
    [b.title, b.section, b.tipos, b.text].some(
      v => typeof v === "string" && v.toLowerCase().includes(k)
    );

  const imagesBy = (k: string) =>
    dataBlocks.filter(b => has(b, k)).flatMap(b => b.additionalImages || []);

  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    const watch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
    const short = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (short) return `https://www.youtube.com/embed/${short[1]}`;
    return null;
  };

  /* ================= DATA ================= */
  const posts = imagesBy("post");
  const certifications = imagesBy("emblema");
  const videoUrl = getEmbedUrl(data.videoAnimado?.[1]?.urlVideo);

  /* ================= WIDGET FLAGS ================= */
  const postWidget = Boolean(data.widgets?.post);
  const videoWidget = Boolean(data.widgets?.videoAnimado);

  /* ================= MODAL STATE ================= */
  const [postIndex, setPostIndex] = useState(0);
  const [postOpen, setPostOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const [postClosed, setPostClosed] = useState(false);
  const [videoClosed, setVideoClosed] = useState(false);

  /* ================= EFFECTS (Original Behavior) ================= */
  useEffect(() => {
    if (postWidget && posts.length && !postClosed) {
      setPostIndex(0);
      setPostOpen(true);
    }
    if (!postWidget) {
      setPostOpen(false);
      setPostClosed(false);
    }
  }, [postWidget, posts.length]);

  useEffect(() => {
    if (videoWidget && videoUrl && !videoClosed) {
      setVideoOpen(true);
    }
    if (!videoWidget) {
      setVideoOpen(false);
      setVideoClosed(false);
    }
  }, [videoWidget, videoUrl]);

  useEffect(() => {
    document.body.style.overflow = postOpen || videoOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [postOpen, videoOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePost();
        closeVideo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ================= NAV & CLOSE ================= */
  const prevPost = () => setPostIndex(i => (i === 0 ? posts.length - 1 : i - 1));
  const nextPost = () => setPostIndex(i => (i === posts.length - 1 ? 0 : i + 1));
  const closePost = () => { setPostOpen(false); setPostClosed(true); };
  const closeVideo = () => { setVideoOpen(false); setVideoClosed(true); };

  if (!posts.length && !certifications.length && !videoUrl) return null;

  return (
    <>
      {/* ================= MAIN CONTAINER ================= */}
      <section className="relative py-20 px-6 text-slate-900 overflow-hidden font-sans">

        {/* Luces ambientales de fondo (Glow effects) */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-36 relative z-10">

          {/* ===== 1. NUEVA SECCIÓN: VIDEO HERO THEATRICAL ===== */}
          {videoUrl && (
            <div className="flex flex-col items-center">
              <div className="text-center max-w-2xl mb-12">
                <span className="text-xs font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Featured Content
                </span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-2 text-white">
                  Experience Our Story
                </h2>
              </div>

              <div
                onClick={() => setVideoOpen(true)}
                className="group relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-slate-800 bg-slate-900"
              >
                {/* Overlay de vidrio que se aclara al hacer hover */}
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-all duration-500 z-10 flex items-center justify-center">

                  {/* Botón de Play Cinemático */}
                  <div className="relative flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/30 group-hover:scale-110 group-hover:bg-white text-white group-hover:text-black shadow-2xl transition-all duration-300">
                    <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75 group-hover:hidden"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 translate-x-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Vista previa miniatura real usando el iframe con eventos bloqueados */}
                <iframe
                  src={`${videoUrl}?controls=0&mute=1&playlist=${videoUrl.split('/').pop()}`}
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 pointer-events-none opacity-60"
                  title="Video Preview"
                />
              </div>
            </div>
          )}


          {posts.length > 0 && (
            <div>
              <div className="mb-12 md:flex md:items-end md:justify-between border-b border-slate-800/60 pb-6">
                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500">
                    Posts
                  </span>
                  <h2 className="text-3xl font-bold text-primary mt-1 tracking-tight">
                    Recent Publications
                  </h2>
                </div>
                <p className="text-slate-400 max-w-xs mt-2 md:mt-0 text-sm font-light">
                  A symmetrical look into our latest updates and visual records.
                </p>
              </div>

              {/* Grid perfectamente simétrico y uniforme */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {posts.map((src, idx) => (
                  <div
                    key={idx}
                    onClick={() => { setPostIndex(idx); setPostOpen(true); }}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-800/80 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl"
                  >
                    {/* Overlay oscuro y suave que se aclara con el hover */}
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-300 z-10" />

                    <img
                      src={src}
                      alt="Gallery content"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out"
                    />

                    {/* Icono de expansión minimalista y discreto en la esquina inferior */}
                    <div className="absolute bottom-4 right-4 z-20 bg-slate-950/60 backdrop-blur-md p-2.5 rounded-xl border border-white/5 text-slate-300 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9m-11.25 11.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 20.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* ===== 3. NUEVA SECCIÓN: INFINITE FLOATING CERTIFICATIONS ===== */}
          {certifications.length > 0 && (
            <div className="pt-10">
              <h3 className="text-center text-xs font-bold tracking-[0.3em] uppercase text-slate-500 mb-12">
                Backed by Trusted Institutions & Certifications
              </h3>

              {/* Contenedor infinito */}
              <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                  {/* Render original */}
                  {certifications.map((src, idx) => (
                    <li key={idx} className="flex-shrink-0 bg-slate-900/40 backdrop-blur-sm border border-slate-800/60 p-6 rounded-2xl shadow-inner hover:border-slate-700 transition-colors duration-300">
                      <img src={src} alt="Certification badge" className="w-24 h-24 object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                    </li>
                  ))}
                </ul>
                {/* Duplicado idéntico para simular loop infinito perfecto */}
                <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                  {certifications.map((src, idx) => (
                    <li key={`dup-${idx}`} className="flex-shrink-0 bg-slate-900/40 backdrop-blur-sm border border-slate-800/60 p-6 rounded-2xl shadow-inner hover:border-slate-700 transition-colors duration-300">
                      <img src={src} alt="Certification badge" className="w-24 h-24 object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>


      {/* ================= MODAL DE POST RESISEÑADO (GLASSMORPHIC) ================= */}
      {postOpen && (
        <div
          onClick={closePost}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
        >
          {/* Botón Cerrar Superior */}
          <button onClick={closePost} className="absolute top-6 right-6 text-slate-400 hover:text-white p-3 bg-slate-900/80 rounded-full border border-slate-800 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div onClick={e => e.stopPropagation()} className="relative max-w-4xl w-full flex items-center justify-center">
            {/* Imagen Principal */}
            <div className="bg-slate-900 p-2 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden max-h-[80vh]">
              <img
                src={posts[postIndex]}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl mx-auto"
                alt="Modal item"
              />
            </div>

            {/* Navegación Flotante Minimalista */}
            <button
              onClick={prevPost}
              className="absolute left-4 md:-left-16 top-1/2 -translate-y-1/2 bg-slate-900/90 text-white p-4 rounded-full border border-slate-700 shadow-xl hover:bg-white hover:text-black transition-all"
            >
              ‹
            </button>
            <button
              onClick={nextPost}
              className="absolute right-4 md:-right-16 top-1/2 -translate-y-1/2 bg-slate-900/90 text-white p-4 rounded-full border border-slate-700 shadow-xl hover:bg-white hover:text-black transition-all"
            >
              ›
            </button>
          </div>
        </div>
      )}


      {/* ================= MODAL DE VIDEO RESISEÑADO ================= */}
      {videoOpen && videoUrl && (
        <div
          onClick={closeVideo}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4"
        >
          {/* Botón Cerrar */}
          <button onClick={closeVideo} className="absolute top-6 right-6 text-slate-400 hover:text-white p-3 bg-slate-900/80 rounded-full border border-slate-800 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            onClick={e => e.stopPropagation()}
            className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
          >
            <iframe
              src={`${videoUrl}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              title="Main Video Player"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PostComponent;