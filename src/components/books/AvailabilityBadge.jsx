
import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import Badge from "../common/Badge";

export default function AvailabilityBadge({
  availableCopies,
  showCount = false,
  size = "md",
  className = ""
}) {
  const copies = Number(availableCopies);
  const validCount = Number.isFinite(copies) && copies > 0
    ? Math.floor(copies)
    : 0;

  let status;

  if (validCount === 0) {
    status = {
      label: "Unavailable",
      variant: "danger",
      icon: XCircle
    };
  } else if (validCount <= 2) {
    status = {
      label: "Limited Stock",
      variant: "warning",
      icon: Clock3
    };
  } else {
    status = {
      label: "Available",
      variant: "success",
      icon: CheckCircle2
    };
  }

  const Icon = status.icon;
  const label = showCount && validCount > 0
    ? `${status.label} · ${validCount} ${validCount === 1 ? "copy" : "copies"}`
    : status.label;

  return (
    <Badge
      variant={status.variant}
      size={size}
      dot={false}
      className={className}
      icon={<Icon size={size === "sm" ? 12 : 14} />}
    >
      {label}
    </Badge>
  );
}
