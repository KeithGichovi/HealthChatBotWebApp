"""added severity level to the Appointment table

Revision ID: c9af65ac1a0a
Revises: 5592a957ca7c
Create Date: 2024-04-16 16:57:54.694360

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c9af65ac1a0a'
down_revision = '5592a957ca7c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('appointments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('severity_level', sa.String(length=255), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('appointments', schema=None) as batch_op:
        batch_op.drop_column('severity_level')

    # ### end Alembic commands ###
