import { ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

// Rendering properties of a single point belonging to a Path
// If an attribute is defined for a point, it overwrites the properties for the path
@ApiTags('Point')
@Controller('PointC')
export class PointProperties {
    @ApiPropertyOptional({ description: 'Color of a point or the entire path' })
    color?: string;
    @ApiPropertyOptional({
        description: 'Radius or largeness of a point or the entire path',
    })
    width?: number;
    @ApiPropertyOptional({
        description: 'Weight (boldness) of a point or the entire path',
    })
    weight?: number;
    @ApiPropertyOptional({
        description: 'Opacity (between 0 and 1) of a point or the entire path',
        minimum: 0,
        maximum: 1,
    })
    opacity?: number;
}

export enum RendererName {
    circle = 'circle',
    circles = 'circles',
    rectangles = 'rectangles',
    line = 'line',
    hotline = 'hotline',
    hotpoints = 'hotpoints',
}

export class PaletteColor {
    @ApiProperty()
    offset: number;
    @ApiProperty()
    color: string;
    @ApiPropertyOptional()
    stopValue?: number;
}

export type Palette = PaletteColor[];

// Rendering properties of an entire Path
export class PathProperties extends PointProperties {
    @ApiProperty({
        description:
            'The name of the renderer to use - see ./renderers for the list of names',
    })
    rendererName: RendererName;
    @ApiPropertyOptional({
        description:
            'Weight can be multiplied by the dilatationFactor, < 1 -> shrinks ; > 1 -> grows ; == 1 -> stays the same',
    })
    dilatationFactor?: number;
    @ApiPropertyOptional({
        description: 'Palette used for coloring the path and graph',
    })
    palette?: Palette;
}

export class Measurement extends PathProperties {
    @ApiProperty({ description: 'measurement as it is in the database' })
    dbName: string;
    @ApiProperty({ description: 'human friendly name of the measurement' })
    name: string;
    @ApiPropertyOptional({
        description:
            'Needs to be specified if the points have a value attached to them',
    })
    hasValue?: boolean;
}

export class MeasurementDTO {
    measurement: Measurement;
}

export class MeasurementEditDTO {
    index: number;
    measurement: Measurement;
}
