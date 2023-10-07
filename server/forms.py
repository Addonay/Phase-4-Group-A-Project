from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import (
    InputRequired,
    Length,
    Email,
    ValidationError,
    Regexp,
)
from models import User

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[
        InputRequired(),
        Length(min=4, max=20),
        Regexp('^\w+$', message='Username must contain only letters, numbers, or underscores.')
    ])
    email = StringField('Email', validators=[InputRequired(), Email()])
    password = PasswordField('Password', validators=[InputRequired(),Length(min=8, max=80) ])
    submit = SubmitField("Register")
    def validate_username(self, field):
        if User.query.filter_by(username=field.data).first():
            raise ValidationError('Username is already in use. Please choose a different one.')

    def validate_email(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('Email address is already registered. Please use a different one.')
    
class LoginForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired(),Length(min=4, max=20),Regexp('^\w+$', message='Username must contain only letters, numbers, or underscores.')
    ])
    password = PasswordField('Password', validators=[InputRequired(), Length(min=8, max=80)])
    remember = BooleanField('Remember me')
    submit = SubmitField("Log In")
