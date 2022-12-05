import { ResponsiveSunburst } from '@nivo/sunburst'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const SunburstChart = ({ data /* see data tab */ }) => (
    <ResponsiveSunburst
        data={data}
        margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
        id="name"
        value="loc"
        cornerRadius={2}
        borderColor={{ theme: 'background' }}
        colors={["#FFB439", "#088AEE", "#07B2A3", "#000027", "#F24E1E"]}
        childColor={{
            from: 'color',
            modifiers: [
                [
                    'brighter',
                    0.1
                ]
            ]
        }}
        enableArcLabels={true}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.4
                ]
            ]
        }}
    />
)