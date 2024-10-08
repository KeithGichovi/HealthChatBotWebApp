"""added endtime for appointment

Revision ID: 5592a957ca7c
Revises: 27a728974e40
Create Date: 2024-04-15 19:37:10.840447

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5592a957ca7c'
down_revision = '27a728974e40'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('appointments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('appointment_end_time', sa.DateTime(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('appointments', schema=None) as batch_op:
        batch_op.drop_column('appointment_end_time')

    # ### end Alembic commands ###
