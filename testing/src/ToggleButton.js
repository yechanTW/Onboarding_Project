import useToggle from "./useToggle";

function ToggleButton({ initial = false }) {
  const [on, toggle] = useToggle(initial);

  return <button onClick={toggle}>{on ? "ON" : "OFF"}</button>;
}

export default ToggleButton;