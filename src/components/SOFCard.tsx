export enum SOFPOSITION {
  LEFT = "left",
  RIGHT = "right",
}

interface SOFCardProps {
  id: number;
  title: string;
  description: string;
  position: SOFPOSITION
}

export default function SOFCard({id, title, description, position}: SOFCardProps) {
  return (
    <div className={'sof-card-container' + (position === "left" ? "left" : "right")}>
      <div className="sof-card-id">
        {id}
      </div>
      <span className={'sof-card-title'}>
        {title}
      </span>
      <span className={'sof-card-description'}>
        {description}
      </span>
    </div>
  )
}