import "@google/model-viewer";

export default function SceneViewer() {
  return (
    <model-viewer
      src="/scene.glb"
      alt="3D Scene"
      auto-rotate
      camera-controls
      ar
      style={{ width: "100%", height: "500px" }}
    />
  );
}
