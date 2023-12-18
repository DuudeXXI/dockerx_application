export const mapOptions = {
  disableDefaultUI: true, // Disable default UI controls
  keyboardShortcuts: false,
  mapTypeControl: false,
  mapTypeControlOptions: {
    mapTypeIds: [], // An empty array disables the "Terms" button
  },
  styles: [
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    // Smaller streets without names
    {
      featureType: "road.local",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off", // hide labels for smaller streets
        },
      ],
    },
    {
      featureType: "road.local.trail",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff", // hide labels for smaller streets
        },
      ],
    },
  ],
};
export const containerStyle = {
  width: "100%",
  height: "100%",
};
