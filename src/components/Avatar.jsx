export const Avatar = ({ initials, color = '#e0e0e0', textColor = '#fff', size = 38, radius }) => (
  <div style={{
    width: size, height: size,
    borderRadius: radius !== undefined ? radius : size / 3.2,
    background: color, color: textColor,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 600, fontSize: size * 0.34, flexShrink: 0,
  }}>
    {initials}
  </div>
);
