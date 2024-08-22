import { ICharacteristic, IGameEntity, IUpdateContext } from "../Interfaces";

export class PhysicsObject implements ICharacteristic {
    public gravityDistancePerTick: number;
    public entityCollisionOffsets: { x: number, y: number }[] = [];
    public environmentCollisionOffsets: { x: number, y: number }[] = [];

    public facing: "LEFT" | "RIGHT";

    constructor() {
        this.gravityDistancePerTick = -8.5;
    }

    public update(context: IUpdateContext, entity: IGameEntity) {
        if (this.entityCollisionOffsets.length === 0) {
            for (let x = 0; x < entity.width; x++) {
                this.environmentCollisionOffsets.push({ x: x, y: 0 });
            }

            this.entityCollisionOffsets = [{
                x: entity.width / 2,
                y: entity.height / 2
            }];
        }

        if (entity.velocityX !== 0) {
            this.facing = entity.velocityX > 0 ? "RIGHT" : "LEFT";
        }

        this.applyGravity(entity);
        this.applyMovement(entity);
    }

    private applyGravity(entity: IGameEntity) {
        if (entity.isJumping) {
            const resistencePerTick = entity.weight / 60;
            entity.velocityY += this.gravityDistancePerTick * resistencePerTick;

            if (entity.velocityY < 0) {
                entity.isJumping = false;
            }

        } else {
            if (this.standingOnAPlatform(entity)) {
                entity.velocityY = 0;
            } else {
                entity.velocityY += this.gravityDistancePerTick / 6;

                if (entity.velocityY < this.gravityDistancePerTick * 2.5) {
                    entity.velocityY = this.gravityDistancePerTick * 2.5;
                }
            }
        }
    }

    public async applyMovement(entity: IGameEntity) {
        let nextX = entity.x + entity.velocityX;
        let nextY = entity.y + entity.velocityY;

        entity.x = Math.floor(nextX);
        entity.y = Math.floor(nextY);

        if (entity.y < 0) {
            entity.y = 0;
            entity.velocityY = 0;
        }

        if (entity.velocityX !== 0) {
            this.facing = entity.velocityX > 0 ? "RIGHT" : "LEFT";
        }
    }

    public standingOnAPlatform(entity: IGameEntity) {
        const points = this.environmentCollisionPoints(entity);
        for (const point of points) {
            if ((point.y - 1) <= 0) {
                return true;
            }
        }
    }

    public environmentCollisionPoints(entity: IGameEntity) {
        return this.collisionPointsFor(this.environmentCollisionOffsets, entity);
    }

    public entityCollisionPoints(entity: IGameEntity) {
        return this.collisionPointsFor(this.entityCollisionOffsets, entity);
    }

    private collisionPointsFor(pointsSource: { x: number, y: number }[], entity: IGameEntity) {
        return pointsSource.map(offset => ({
            x: this.facing == "RIGHT" ? entity.x + offset.x : entity.x + entity.width - offset.x,
            y: entity.y + offset.y
        }));
    }
}
